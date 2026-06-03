from fastapi import FastAPI
from routes import pacientes

app = FastAPI()

app.include_router(pacientes.router)