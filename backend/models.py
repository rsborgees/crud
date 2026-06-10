from pydantic import BaseModel

class Paciente(BaseModel):
    nome: str
    telefone: str

class Agendamento(BaseModel):
    paciente_id: int
    medico_id: int
    data: str
    horario: str

class Medico(BaseModel):
    nome: str
    especialidade: str
    telefone: str