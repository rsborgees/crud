from fastapi import APIRouter
from ..database import get_connection
from ..models import Paciente

router = APIRouter()

# Rota para criar um novo paciente

@router.post("/pacientes")
def criar_paciente(paciente: Paciente):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "INSERT INTO pacientes (nome, email, telefone, data_nascimento) VALUES (%s, %s, %s, %s)",
        (paciente.nome, paciente.email, paciente.telefone, paciente.data_nascimento)
    )

    connection.commit()
    cursor.close()
    connection.close()
    
    return {
        "nome": paciente.nome,
        "email": paciente.email,
        "telefone": paciente.telefone,
        "data_nascimento": paciente.data_nascimento
    }

# Rota para atualizar um paciente existente

@router.put("/pacientes/{id}")
def atualizar_paciente(id: int, paciente: Paciente):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "UPDATE pacientes SET nome=%s, email=%s, telefone=%s, data_nascimento=%s WHERE idPaciente=%s",
        (paciente.nome, paciente.email, paciente.telefone, paciente.data_nascimento, id)
    )

    connection.commit()

    if cursor.rowcount == 0:
        cursor.close()
        connection.close()
         
        return {
            "message": "Paciente não encontrado"
        }

    cursor.close()
    connection.close()

    return {
        "nome": paciente.nome,
        "email": paciente.email,
        "telefone": paciente.telefone,
        "data_nascimento": paciente.data_nascimento
    }

# Rota para obter um paciente por nome

@router.get("/pacientes/{id}")
def obter_paciente(id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT idPaciente, nome, email, telefone, data_nascimento FROM pacientes WHERE idPaciente=%s",
        (id,)
    )

    paciente = cursor.fetchone()
    cursor.close()
    connection.close()
    
    if not paciente:
        return {"error": "Paciente não encontrado"}

    return {
        "id": paciente[0],
        "nome": paciente[1],
        "email": paciente[2],
        "telefone": paciente[3],
        "data_nascimento": paciente[4]
    }

  # Rota para obter todos os pacientes

@router.get("/pacientes")
def obter_pacientes():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT idPaciente, nome, email, telefone, data_nascimento FROM pacientes",
    )

    pacientes = cursor.fetchall()
    cursor.close()
    connection.close()


    return [
        {
            "id": p[0],
            "nome": p[1],
            "email": p[2],
            "telefone": p[3],
            "data_nascimento": p[4]
        }
        for p in pacientes
    ]

  # Rota para deletar um paciente por id

@router.delete("/pacientes/{id}")
def deletar_pacientes(id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM pacientes WHERE idPaciente=%s",
        (id,)
    )

    connection.commit()
    
    # Verifica se alguma linha foi deletada
    if cursor.rowcount == 0:
        cursor.close()
        connection.close()
        return {
            "message": "Nenhum paciente encontrado"
        }
    
    cursor.close()
    connection.close()

    return {
        "message": "Paciente deletado com sucesso"
    }

