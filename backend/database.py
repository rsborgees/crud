def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="R260207afa!",
        database="clinica"
    )