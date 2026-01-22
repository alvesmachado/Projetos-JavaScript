export let estoqueArray = [// --- ELETRÔNICOS (Categoria 1) ---
    {
        'id': 1,
        'nome': 'Apple iPhone 17 Pro (512 GB) - Laranja cósmico',
        'categoriaId': 1,
        'imagem': 'https://m.media-amazon.com/images/I/71Uw-zydT2L._AC_SX522_.jpg',
        'preco': 11699,
        'desconto': 0,
        'estoque': 100
    },
    {
        'id': 2,
        'nome': 'Tablet Samsung Galaxy Tab S10 FE 5G, Cinza, 128GB',
        'categoriaId': 1,
        'imagem': 'https://m.media-amazon.com/images/I/51bMpXzY0oL._AC_SX679_.jpg',
        'preco': 3000,
        'desconto': 0,
        'estoque': 0
    },
    {
        'id': 3,
        'nome': 'Apple Watch Series 10 GPS - Alumínio 42mm',
        'categoriaId': 1,
        'imagem': 'https://m.media-amazon.com/images/I/51EBZWetZqL._AC_SX342_SY445_QL70_ML2_.jpg',
        'preco': 5499,
        'desconto': 2200,
        'estoque': 100
    },
    {
        'id': 4,
        'nome': 'AirPods 4 com Cancelamento Ativo de Ruído',
        'categoriaId': 1,
        'imagem': 'https://m.media-amazon.com/images/I/41WMBnjyitL._AC_SX522_.jpg',
        'preco': 1999,
        'desconto': 300,
        'estoque': 60
    },

    // --- MODA (Categoria 2) ---
    {
        'id': 6,
        'nome': 'Relógio Casio Masculino Digital Esportivo Preto',
        'categoriaId': 2,
        'imagem': 'https://m.media-amazon.com/images/I/519hi3nRooL._AC_SX522_.jpg',
        'preco': 189,
        'desconto': 20,
        'estoque': 50
    },
    {
        'id': 7,
        'nome': 'Tênis Nike Revolution 7 Masculino - Preto',
        'categoriaId': 2,
        'imagem': 'https://imgnike-a.akamaihd.net/768x768/027285INA8.jpg',
        'preco': 399,
        'desconto': 50,
        'estoque': 30
    },
    {
        'id': 8,
        'nome': 'Óculos de Sol Ray-Ban Justin Classic',
        'categoriaId': 2,
        'imagem': 'https://assets2.sunglasshut.com/cdn-record-files-pi/7f07f29c-923a-40ef-821f-a44800f9c4cf/d0bc7851-97c8-48b3-99ea-ad4200b844ad/0RB4165__601_71__STD__shad__qt.png?impolicy=SGH_bgtransparent&width=1024',
        'preco': 750,
        'desconto': 100,
        'estoque': 15
    },

    // --- CASA (Categoria 3) ---
    {
        'id': 5,
        'nome': 'Sofá Retrátil e Reclinável 2 Lugares Veludo Cinza',
        'categoriaId': 3,
        'imagem': 'https://m.media-amazon.com/images/I/5187yyhPrjL._AC_SX679_.jpg',
        'preco': 999,
        'desconto': 0,
        'estoque': 120
    },
    {
        'id': 9,
        'nome': 'Fritadeira Air Fryer Mondial 4L, 1500W - Preta',
        'categoriaId': 3,
        'imagem': 'https://novomundo.vtexassets.com/arquivos/ids/28233356-800-800?v=638793827535170000&width=800&height=800&aspect=true',
        'preco': 450,
        'desconto': 50,
        'estoque': 80
    },
    {
        'id': 10,
        'nome': 'Robô Aspirador de Pó WAP ROBOT W100',
        'categoriaId': 3,
        'imagem': 'https://lojaibyte.vteximg.com.br/arquivos/ids/194406-1200-1200/42745-03-aspirador-de-po-robo-wap-robot-w100-com-mop-automatico-e-inteligente.jpg?v=637309395883600000',
        'preco': 499,
        'desconto': 30,
        'estoque': 25
    },
    {
        'id': 11,
        'nome': 'Jogo de Panelas Antiaderente 5 Peças Tramontina',
        'categoriaId': 3,
        'imagem': 'https://t62533.vteximg.com.br/arquivos/ids/945641-1000-1000/20298061PDM001G.jpg?v=638627823856770000',
        'preco': 280,
        'desconto': 0,
        'estoque': 40
    }
]

export let categoriaArray = [
	{
    'id': -2,
    'nome': 'Produto',
    'desc': 'Frete grátis em todos os produtos!'
    },
    {
    'id': -1,
    'nome': 'Carrinho',
    'desc': 'Sua lista de compra aqui!'
    },
    {
    'id': 0,
    'nome': 'Início',
    'desc': 'Tudo que você precisa!'
    },
    {
    'id': 1,
    'nome': 'Eletrônicos',
    'desc': 'Os melhores gadgets e acessórios para o seu dia a dia.'
    },
    {
    'id': 2,
    'nome': 'Moda',
    'desc': 'Os melhores roupas e acessórios para o seu dia a dia.'
    },
    {
    'id': 3,
    'nome': 'Casa',
    'desc': 'Os melhores móveis para a decoração da sua casa!'
    }
]

export let conta = [
    {
        'id': 1,
        'nome': 'Michael Douglas Alves Machado',
        'email': 'michaeldouglasalvesmachado@gmail.com',
        'carrinho': localStorage.getItem('carrinho1') ? JSON.parse(localStorage.getItem('carrinho1')) : []
    },
	{
        'id': 2,
        'nome': 'Nicolas Alves Machado',
        'email': 'nicolasalvesmachado@gmail.com',
        'carrinho': localStorage.getItem('carrinho2') ? JSON.parse(localStorage.getItem('carrinho2')) : []
    }
]

export let contaLogadaId = 1

// api/ infos que pedimos ao bak /\