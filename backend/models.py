from pydantic import BaseModel

class Paciente(BaseModel):
    nome: str
    telefone: str

class Agendamento(BaseModel):
    paciente_id: int
    data: str
    horario: str