from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import medicos, paciente, agendamentos

app = FastAPI()

# Allow CORS for local frontend dev servers
origins = [
	"http://localhost:5173",
	"http://127.0.0.1:5173",
	"http://localhost:3000",
	"http://127.0.0.1:3000",
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(medicos.router)
app.include_router(paciente.router)
app.include_router(agendamentos.router)