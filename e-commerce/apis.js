export let estoqueArray = [{
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
	'nome': 'Tablet Samsung Galaxy Tab S10 FE 5G, Cinza, 128GB, 8GB RAM, Tela Imersiva de 10.9" 90Hz, Camera Traseira de 13MP, Câmera Frontal de 12MP Ultra Wide, Wifi 6, IP68, Android 15',
	'categoriaId': 1,
	'imagem': 'https://m.media-amazon.com/images/I/51bMpXzY0oL._AC_SX679_.jpg',
	'preco': 3000,
	'desconto': 0,
	'estoque': 0
	},
    {
	'id': 3,
	'nome': 'Apple Watch Series 10 GPS • Caixa prateada de alumínio – 42 mm • Pulseira esportiva denim – M/G',
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
    {
	'id': 5,
	'nome': 'Sofá Retrátil e Reclinável 2 Lugares 1,80m Veludo Malibu Cinza',
	'categoriaId': 3,
	'imagem': 'https://m.media-amazon.com/images/I/5187yyhPrjL._AC_SX679_.jpg',
	'preco': 999,
	'desconto': 0,
	'estoque': 120
	}
]

export let categoriaArray = [
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