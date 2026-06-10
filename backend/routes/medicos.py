from fastapi import APIRouter
from ..database import get_connection
from ..models import Medico

# Cria um roteador FastAPI para agrupar rotas de médico
router = APIRouter()

# Rota para criar um novo médico
@router.post("/medicos")
def criar_medico(medico: Medico):
    # Abre conexão com o banco e cria cursor para executar a query
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "INSERT INTO medicos (nome, especialidade, telefone) VALUES (%s, %s, %s)",
        (medico.nome, medico.especialidade, medico.telefone)
    )

    # Salva a inserção no banco de dados
    connection.commit()
    cursor.close()
    connection.close()
    
    # Retorna os dados do médico criado
    return {
        "nome": medico.nome,
        "especialidade": medico.especialidade,
        "telefone": medico.telefone
    }

# Rota para listar todos os médicos
@router.get("/medicos")
def listar_medicos():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM medicos")

    medicos = cursor.fetchall()
    cursor.close()
    conn.close()

    # Converte cada linha de resultado em um dicionário JSON-friendly
    return [
        {
            "id": m[0],
            "nome": m[1],
            "especialidade": m[2],
            "telefone": m[3]
        }
        for m in medicos
    ]

# Rota para obter um médico pelo ID
@router.get("/medicos/{id}")
def obter_medico(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM medicos WHERE idMedico=%s", (id,))

    medico = cursor.fetchone()
    cursor.close()
    conn.close()

    # Retorna mensagem caso o médico não exista
    if medico is None:
        return {
            "message": "Médico não encontrado"
        }

    # Retorna os dados do médico encontrado
    return {
        "id": medico[0],
        "nome": medico[1],
        "especialidade": medico[2],
        "telefone": medico[3]
    }

# Rota para atualizar um médico existente
@router.put("/medicos/{id}")
def atualizar_medico(id: int, medico: Medico):      
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE medicos SET nome=%s, especialidade=%s, telefone=%s WHERE idMedico=%s",
        (medico.nome, medico.especialidade, medico.telefone, id)
    )
    conn.commit()

    # Se nenhuma linha foi alterada, o ID não foi encontrado
    if cursor.rowcount == 0:
        cursor.close()
        conn.close()

        return {
            "message": "Médico não encontrado"
        }       

    cursor.close()
    conn.close()

    return {
        "id": id,
        "nome": medico.nome,
        "especialidade": medico.especialidade,
        "telefone": medico.telefone
    }

# Rota para deletar um médico pelo ID
@router.delete("/medicos/{id}")
def deletar_medico(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM medicos WHERE idMedico=%s",
        (id,)
    )

    conn.commit()

    # Se nenhuma linha foi deletada, o médico não existe
    if cursor.rowcount == 0:
        cursor.close()
        conn.close()

        return {
            "message": "Nenhum médico encontrado"
        }

    cursor.close()
    conn.close()

    return {
        "message": "Médico deletado com sucesso"
    }
