from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

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

class Pedido(Base): 
    __tablename__="pedido"
    id= Column(Integer, primary_key=True)
    quantidade=Column(Integer)
    total=Column(Float)

    usuario_id=Column(Integer, ForeignKey("usuario.id"))
    produto_id=Column(Integer, ForeignKey("produto.id"))

    usuario= relationship("Usuario", back_populates="pedidos")
    produto= relationship("Produto", back_populates="pedidos")
