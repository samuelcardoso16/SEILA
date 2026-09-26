from sqlalchemy import Column, Integer, Float, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True)
    nome = Column(String)
    email = Column(String)
    idade = Column(Integer)
    altura = Column(Float)

class Produto(Base): 
    __tablename__="produto"
    id= Column(Integer, primary_key=True)
    nome=Column(String)
    preco=Column(Float)
    quantidade=Column(Integer)