from fastapi import APIRouter
from ..database import get_connection
from ..models import Agendamento

# Cria um roteador FastAPI para as rotas de agendamento
router = APIRouter()

# Rota para criar um novo agendamento
@router.post("/agendamentos")
def criar_agendamento(agendamento: Agendamento):
    conn = get_connection()
    cursor = conn.cursor()

    # Verifica se o paciente existe antes de criar o agendamento
    cursor.execute("SELECT 1 FROM pacientes WHERE idPaciente=%s", (agendamento.paciente_id,))
    if cursor.fetchone() is None:
        cursor.close()
        conn.close()
        return {
            "message": "Paciente não encontrado"
        }

    # Verifica se o médico existe antes de criar o agendamento
    cursor.execute("SELECT 1 FROM medicos WHERE idMedico=%s", (agendamento.medico_id,))
    if cursor.fetchone() is None:
        cursor.close()
        conn.close()
        return {
            "message": "Médico não encontrado"
        }

    # Verifica conflito de horário para o mesmo médico
    cursor.execute(
        "SELECT 1 FROM agendamentos WHERE idMedico=%s AND data_consulta=%s AND hora_consulta=%s",
        (agendamento.medico_id, agendamento.data, agendamento.horario)
    )
    if cursor.fetchone() is not None:
        cursor.close()
        conn.close()
        return {
            "message": "Horário já está ocupado para este médico"
        }

    # Insere o agendamento somente se paciente e médico existirem
    cursor.execute(
        "INSERT INTO agendamentos (idPaciente, idMedico, data_consulta, hora_consulta) VALUES (%s, %s, %s, %s)",
        (agendamento.paciente_id, agendamento.medico_id, agendamento.data, agendamento.horario)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return {
        "paciente_id": agendamento.paciente_id,
        "medico_id": agendamento.medico_id,
        "data": agendamento.data,
        "horario": agendamento.horario
    }

# Rota para listar todos os agendamentos
@router.get("/agendamentos")
def listar_agendamentos():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM agendamentos")

    agendamentos = cursor.fetchall()
    cursor.close()
    conn.close()

    # Converte cada resultado em dicionário para JSON
    return [
        {
            "id": a[0],
            "paciente_id": a[1],
            "medico_id": a[2],
            "data": a[3],
            "horario": a[4]
        }
        for a in agendamentos
    ]

# Rota para obter um agendamento pelo ID
@router.get("/agendamentos/{id}")
def obter_agendamento(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM agendamentos WHERE idAgendamento = %s", (id,))

    agendamento = cursor.fetchone()
    cursor.close()
    conn.close()

    if agendamento:
        return {
            "id": agendamento[0],
            "paciente_id": agendamento[1],
            "medico_id": agendamento[2],
            "data": agendamento[3],
            "horario": agendamento[4]
        }
    else:
        return {
            "message": "Agendamento não encontrado"
        }

# Rota para atualizar um agendamento existente
@router.put("/agendamentos/{id}")
def atualizar_agendamento(id: int, agendamento: Agendamento):
    conn = get_connection()
    cursor = conn.cursor()

    # Valida se o paciente existe antes de atualizar
    cursor.execute("SELECT 1 FROM pacientes WHERE idPaciente=%s", (agendamento.paciente_id,))
    if cursor.fetchone() is None:
        cursor.close()
        conn.close()
        return {
            "message": "Paciente não encontrado"
        }

    # Valida se o médico existe antes de atualizar
    cursor.execute("SELECT 1 FROM medicos WHERE idMedico=%s", (agendamento.medico_id,))
    if cursor.fetchone() is None:
        cursor.close()
        conn.close()
        return {
            "message": "Médico não encontrado"
        }

    # Valida conflito de horário para o mesmo médico no update
    cursor.execute(
        "SELECT 1 FROM agendamentos WHERE idMedico=%s AND data_consulta=%s AND hora_consulta=%s AND idAgendamento != %s",
        (agendamento.medico_id, agendamento.data, agendamento.horario, id)
    )
    if cursor.fetchone() is not None:
        cursor.close()
        conn.close()
        return {
            "message": "Horário já está ocupado para este médico"
        }

    # Atualiza o agendamento com os novos dados
    cursor.execute(
        "UPDATE agendamentos SET idPaciente=%s, idMedico=%s, data_consulta=%s, hora_consulta=%s WHERE idAgendamento=%s",
        (agendamento.paciente_id, agendamento.medico_id, agendamento.data, agendamento.horario, id)
    )
    conn.commit()

    # Se não houve linha afetada, o agendamento não existe
    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        return {
            "message": "Agendamento não encontrado"
        }

    cursor.close()
    conn.close()

    return {
        "id": id,
        "paciente_id": agendamento.paciente_id,
        "medico_id": agendamento.medico_id,
        "data": agendamento.data,
        "horario": agendamento.horario
    }

# Rota para deletar um agendamento pelo ID
@router.delete("/agendamentos/{id}")
def deletar_agendamento(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM agendamentos WHERE idAgendamento = %s", (id,))
    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()

        return {
            "message": "Agendamento não encontrado"
        }

    cursor.close()
    conn.close()

    return {
        "message": "Agendamento deletado com sucesso"
    }