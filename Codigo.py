import requestes
 
url = "https://jsonplaceholder.typicode.com/users"
resposta=requestes.get(url)
print(resposta.status_code)
usuarios = resposta.json()

for usuario in usuarios:
    print(f"ID: {usuario['id']}")
    print(f"Nome: {usuario['name']}")
    print(f"Username: {usuario['username']}")
    print(f"E-mail: {usuario['email']}")
    print(f"Telefone: {usuario['phone']}")
    print(f"Website: {usuario['website']}")
    
    dados_endereco = usuario['address']
    print(f"Endereço - Rua: {dados_endereco['street']}")
    print(f"Endereço - Suíte: {dados_endereco['suite']}")
    print(f"Endereço - Cidade: {dados_endereco['city']}")
    print(f"Endereço - CEP: {dados_endereco['zipcode']}")
    
    
    dados_geo = dados_endereco['geo']
    print(f"Geolocalização - Lat: {dados_geo['lat']} | Lng: {dados_geo['lng']}")
    

    dados_empresa = usuario['company']
    print(f"Empresa - Nome: {dados_empresa['name']}")
    print(f"Empresa - Slogan: {dados_empresa['catchPhrase']}")
    print(f"Empresa - BS: {dados_empresa['bs']}")
    
    print("-----------------------------")
    