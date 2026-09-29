from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Pedido, Usuario, Produto

app = Flask(__name__)
CORS(app)

engine = create_engine("sqlite:///database.db")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)


@app.route("/usuarios", methods=["GET"])
def get_usuarios():
    s = Session()

    usuarios = s.query(Usuario).all()

    return jsonify([
        {
            "id": u.id,
            "nome": u.nome,
            "email": u.email,
            "idade": u.idade,
            "altura": u.altura
        }
        for u in usuarios
    ])


@app.route("/usuarios/<int:id>", methods=["GET"])
def get_usuario_unico(id):
    s = Session()

    usuario = s.query(Usuario).get(id)

    if usuario is None:
        return jsonify({
            "message": "Usuário não encontrado!"
        }), 404

    return jsonify({
        "id": usuario.id,
        "nome": usuario.nome,
        "email": usuario.email,
        "idade": usuario.idade,
        "altura": usuario.altura
    })


@app.route("/usuarios", methods=["POST"])
def add_usuario():
    s = Session()

    data = request.json

    u = Usuario(
        nome=data["nome"],
        email=data["email"],
        idade=data["idade"],
        altura=data["altura"]
    )

    s.add(u)
    s.commit()

    return jsonify({
        "message": "Usuário cadastrado com sucesso!"
    }), 201


@app.route("/usuarios/<int:id>", methods=["PUT"])
def atualizar_usuario(id):
    s = Session()

    usuario = s.query(Usuario).get(id)

    if usuario is None:
        return jsonify({
            "message": "Usuário não encontrado!"
        }), 404

    data = request.json

    usuario.nome = data["nome"]
    usuario.email = data["email"]
    usuario.idade = data["idade"]
    usuario.altura = data["altura"]

    s.commit()

    return jsonify({
        "message": "Usuário atualizado com sucesso!"
    }), 200


@app.route("/usuarios/<int:id>", methods=["DELETE"])
def deletar_usuario(id):
    s = Session()

    usuario = s.query(Usuario).get(id)

    if usuario is None:
        return jsonify({
            "message": "Usuário não encontrado!"
        }), 404

    s.delete(usuario)
    s.commit()

    return jsonify({
        "message": "Usuário deletado com sucesso!"
    }), 200


@app.route("/produtos", methods=["POST"])
def adicionar_produto():
    s = Session()

    data = request.json

    produto = Produto(
        nome=data["nome"],
        preco=data["preco"],
        quantidade=data["quantidade"]
    )

    s.add(produto)
    s.commit()

    return jsonify({
        "message": "Produto cadastrado com sucesso!"
    }), 201


@app.route("/produtos", methods=["GET"])
def listar_produtos():
    s = Session()

    produtos = s.query(Produto).all()

    resultado = []

    for produto in produtos:
        resultado.append({
            "id": produto.id,
            "nome": produto.nome,
            "preco": produto.preco,
            "quantidade": produto.quantidade
        })

    return jsonify(resultado)


@app.route("/produtos/<int:id>", methods=["GET"])
def buscar_produto(id):
    s = Session()

    produto = s.query(Produto).get(id)

    if produto is None:
        return jsonify({
            "message": "Produto não encontrado!"
        }), 404

    return jsonify({
        "id": produto.id,
        "nome": produto.nome,
        "preco": produto.preco,
        "quantidade": produto.quantidade
    })


@app.route("/produtos/<int:id>", methods=["PUT"])
def atualizar_produto(id):
    s = Session()

    produto = s.query(Produto).get(id)

    if produto is None:
        return jsonify({
            "message": "Produto não encontrado!"
        }), 404

    data = request.json

    produto.nome = data["nome"]
    produto.preco = data["preco"]
    produto.quantidade = data["quantidade"]

    s.commit()

    return jsonify({
        "message": "Produto atualizado com sucesso!"
    }), 200


@app.route("/produtos/<int:id>", methods=["DELETE"])
def deletar_produto(id):
    s = Session()

    produto = s.query(Produto).get(id)

    if produto is None:
        return jsonify({
            "message": "Produto não encontrado!"
        }), 404

    s.delete(produto)
    s.commit()

    return jsonify({
        "message": "Produto deletado com sucesso!"
    }), 200

@app.route('/pedidos/<int:id>', methods=['GET'])
def get_pedidos(id):
    s = Session()
    pedido = s.query(Usuario).get(id) 
    
    if not pedido:
        return jsonify({'erro': 'Pedido não encontrado'}), 404
        
    return jsonify({
        'id': pedido.id, 
        'quantidade': pedido.quantidade, 
        'total': pedido.total, 
        'usuario_id': pedido.usuario_id, 
        'produto_id': pedido.produto_id
    })


from flask import Flask, request, jsonify

@app.route('/pedidos/<int:id>', methods=['POST'])
def add_pedidos(id):
    s = Session()
    data = request.json
    prod_info = s.query(Produto).get(data['produto_id'])
    
    pedido = Pedido(
        quantidade=data['quantidade'], 
        total=data['total'], 
        usuario_id=data['usuario_id'],
        produto_id=data['produto_id']
    )
    
    s.add(pedido)
    s.commit()
    return jsonify({'message': 'Pedido cadastrado com sucesso!'})



if __name__ == "__main__":
    app.run(debug=True)
