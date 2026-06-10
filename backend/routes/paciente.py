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
        "INSERT INTO pacientes (nome, telefone) VALUES (%s, %s)",
        (paciente.nome, paciente.telefone)
    )

    connection.commit()
    cursor.close()
    connection.close()
    
    return {
        "nome": paciente.nome,
        "telefone": paciente.telefone
    }

# Rota para atualizar um paciente existente

@router.put("/pacientes/{id}")
def atualizar_paciente(id: int, paciente: Paciente):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "UPDATE pacientes SET nome=%s, telefone=%s WHERE idPaciente=%s",
        (paciente.nome, paciente.telefone, id)
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
        "telefone": paciente.telefone
    }

# Rota para obter um paciente por nome

@router.get("/pacientes/{id}")
def obter_paciente(id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM pacientes WHERE idPaciente=%s",
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
        "telefone": paciente[2]
    }

  # Rota para obter todos os pacientes

@router.get("/pacientes")
def obter_pacientes():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM pacientes",
    )

    pacientes = cursor.fetchall()
    cursor.close()
    connection.close()


    return [
        {
            "id": p[0],
            "nome": p[1],
            "telefone": p[2]
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

