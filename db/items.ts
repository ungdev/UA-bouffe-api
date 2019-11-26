import Item from '../src/models/item';

const seedItems = () => {
  let items = [
    {
      id: 1,
      name: 'Pepsi',
      key: 'pepsi',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 2,
      name: 'Pepsi Max',
      key: 'pepsimax',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 3,
      name: 'Ice Tea Green',
      key: 'iceteagreen',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 4,
      name: 'Ice Tea Pêche',
      key: 'iceteapeche',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 5,
      name: 'Orangina',
      key: 'orangina',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 6,
      name: 'Schweppes Agrumes',
      key: 'schweppes',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 7,
      name: '7Up',
      key: '7up',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 8,
      name: 'Fanta Orange',
      key: 'fanta',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 9,
      name: 'Oasis Orange',
      key: 'oasisorange',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 10,
      name: 'Oasis PCF',
      key: 'oasispcf',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 11,
      name: 'Oasis Tropical',
      key: 'oasistropical',
      promoKey: 'canette',
      price: 100,
      orgaPrice: 60,
      categoryId: 1,
    },
    {
      id: 12,
      name: "Bouteille d'eau",
      key: 'eau',
      promoKey: null,
      price: 70,
      orgaPrice: 50,
      categoryId: 1,
    },
    {
      id: 13,
      name: 'Monster Energy',
      key: 'monsterenergy',
      promoKey: null,
      price: 250,
      orgaPrice: 200,
      categoryId: 1,
    },
    {
      id: 14,
      name: 'Monster Assault',
      key: 'monsterassault',
      promoKey: null,
      price: 250,
      orgaPrice: 200,
      categoryId: 1,
    },
    {
      id: 15,
      name: 'Monster Ultra Zéro',
      key: 'monsterzero',
      promoKey: null,
      price: 250,
      orgaPrice: 200,
      categoryId: 1,
    },
    {
      id: 16,
      name: 'Café',
      key: 'cafe',
      promoKey: null,
      price: 50,
      orgaPrice: 0,
      categoryId: 1,
    },
    {
      id: 17,
      name: 'Thé',
      key: 'the',
      promoKey: null,
      price: 50,
      orgaPrice: 0,
      categoryId: 1,
    },
    {
      id: 18,
      name: 'Chocolat',
      key: 'chocolat',
      promoKey: null,
      price: 100,
      orgaPrice: 70,
      categoryId: 1,
    },
    {
      id: 19,
      name: 'Bounty',
      key: 'bounty',
      promoKey: 'barre',
      price: 100,
      orgaPrice: 70,
      categoryId: 2,
    },
    {
      id: 20,
      name: 'Snickers',
      key: 'snickers',
      promoKey: 'barre',
      price: 100,
      orgaPrice: 70,
      categoryId: 2,
    },
    {
      id: 21,
      name: 'Kinder Bueno',
      key: 'kinder',
      promoKey: 'barre',
      price: 100,
      orgaPrice: 70,
      categoryId: 2,
    },
    {
      id: 22,
      name: 'Kit Kat',
      key: 'kitkat',
      promoKey: 'barre',
      price: 100,
      orgaPrice: 70,
      categoryId: 2,
    },
    {
      id: 23,
      name: 'Twix',
      key: 'twix',
      promoKey: 'barre',
      price: 100,
      orgaPrice: 70,
      categoryId: 2,
    },
    {
      id: 24,
      name: "Pom'potes",
      key: 'pompotes',
      promoKey: null,
      price: 60,
      orgaPrice: 50,
      categoryId: 2,
    },
    {
      id: 25,
      name: 'Bonbons Schtroumpf',
      key: 'schtroumpf',
      promoKey: null,
      price: 70,
      orgaPrice: 70,
      categoryId: 2,
    },
    {
      id: 26,
      name: 'Bonbons Dragibus',
      key: 'dragibus',
      promoKey: null,
      price: 70,
      orgaPrice: 70,
      categoryId: 2,
    },
    {
      id: 27,
      name: 'Chips',
      key: 'chips',
      promoKey: null,
      price: 60,
      orgaPrice: 30,
      categoryId: 2,
    },
    {
      id: 28,
      name: 'Crêpe Jambon Fromage',
      key: 'crepejambonfromage',
      promoKey: 'crepe',
      price: 150,
      orgaPrice: 100,
      categoryId: 3,
    },
    {
      id: 29,
      name: 'Crêpe Complète',
      key: 'crepecomplete',
      promoKey: 'complete',
      price: 200,
      orgaPrice: 150,
      categoryId: 3,
    },
    {
      id: 30,
      name: 'Crêpe Chèvre Miel',
      key: 'crepechevremiel',
      promoKey: 'crepe',
      price: 150,
      orgaPrice: 100,
      categoryId: 3,
    },
    {
      id: 31,
      name: 'Crêpe Fraise',
      key: 'crepefraise',
      promoKey: null,
      price: 100,
      orgaPrice: 50,
      categoryId: 3,
    },
    {
      id: 32,
      name: 'Crêpe Abricot',
      key: 'crepeabricot',
      promoKey: null,
      price: 100,
      orgaPrice: 50,
      categoryId: 3,
    },
    {
      id: 33,
      name: 'Crêpe Miel',
      key: 'crepemiel',
      promoKey: null,
      price: 100,
      orgaPrice: 50,
      categoryId: 3,
    },
    {
      id: 34,
      name: 'Crêpe Sucre',
      key: 'crepecsucre',
      promoKey: null,
      price: 100,
      orgaPrice: 50,
      categoryId: 3,
    },
    {
      id: 35,
      name: 'Crêpe Nutella',
      key: 'crepenutella',
      promoKey: null,
      price: 100,
      orgaPrice: 50,
      categoryId: 3,
    },
    {
      id: 36,
      name: 'Croque Jambon Fromage',
      key: 'croquejambonfromage',
      promoKey: 'croque',
      price: 150,
      orgaPrice: 100,
      categoryId: 4,
    },
    {
      id: 37,
      name: 'Croque 3 Fromages',
      key: 'croque3fromage',
      promoKey: 'croque',
      price: 150,
      orgaPrice: 100,
      categoryId: 4,
    },
    {
      id: 38,
      name: 'Croque Tomate Mozza',
      key: 'croquetomatemozza',
      promoKey: 'croque',
      price: 150,
      orgaPrice: 100,
      categoryId: 4,
    },
    {
      id: 39,
      name: 'Croque Nutella',
      key: 'croquenutella',
      promoKey: 'croquenut',
      price: 100,
      orgaPrice: 50,
      categoryId: 4,
    },
    {
      id: 40,
      name: 'Pizza Jambon Fromage',
      key: 'pizzajambonfromage',
      promoKey: 'pizza',
      price: 450,
      orgaPrice: 350,
      categoryId: 5,
    },
    {
      id: 41,
      name: 'Pizza Chèvre Lardons',
      key: 'pizzachevrelardons',
      promoKey: 'pizza',
      price: 450,
      orgaPrice: 350,
      categoryId: 5,
    },
    {
      id: 42,
      name: 'Pizza Royale',
      key: 'pizzaroyale',
      promoKey: 'pizza',
      price: 450,
      orgaPrice: 350,
      categoryId: 5,
    },
    {
      id: 43,
      name: 'Pizza Chorizo',
      key: 'pizzachorizo',
      promoKey: 'pizza',
      price: 450,
      orgaPrice: 350,
      categoryId: 5,
    },
    {
      id: 44,
      name: 'Sandwich Végétarien',
      key: 'sandvg',
      promoKey: null,
      price: 250,
      orgaPrice: 200,
      categoryId: 6,
    },
    {
      id: 45,
      name: 'Sandwich Thon Mayonnaise',
      key: 'sandthonmayo',
      promoKey: null,
      price: 250,
      orgaPrice: 200,
      categoryId: 6,
    },
    {
      id: 46,
      name: 'Sandwich Jambon Beurre',
      key: 'sandjambonbeurre',
      promoKey: null,
      price: 250,
      orgaPrice: 200,
      categoryId: 6,
    },
    {
      id: 47,
      name: 'Pain au Chocolat',
      key: 'petitpain',
      promoKey: null,
      price: 10000,
      orgaPrice: 10000,
      categoryId: 7,
    },
    {
      id: 48,
      name: 'Croissant',
      key: 'croissant',
      promoKey: null,
      price: 10000,
      orgaPrice: 10000,
      categoryId: 7,
    },
    {
      id: 49,
      name: 'Tartine Confiture',
      key: 'tartineconfiture',
      promoKey: null,
      price: 100,
      orgaPrice: 50,
      categoryId: 7,
    },
    {
      id: 50,
      name: 'Tartine Nutella',
      key: 'tartinenutella',
      promoKey: null,
      price: 100,
      orgaPrice: 50,
      categoryId: 7,
    },
    {
      id: 51,
      name: "Pin's",
      key: 'pins',
      promoKey: null,
      price: 100,
      orgaPrice: 100,
      categoryId: 8,
    },
    {
      id: 52,
      name: 'T-shirt',
      key: 'tshirt',
      promoKey: null,
      price: 1500,
      orgaPrice: 1000,
      categoryId: 8,
    },
    {
      id: 53,
      name: 'Ethernet 5 mètres',
      key: 'ethernet5',
      promoKey: null,
      price: 700,
      orgaPrice: 700,
      categoryId: 8,
    },
    {
      id: 54,
      name: 'Ethernet 7 mètres',
      key: 'ethernet7',
      promoKey: null,
      price: 1000,
      orgaPrice: 1000,
      categoryId: 8,
    },
    {
      id: 55,
      name: 'Multiprise',
      key: 'multiprise',
      promoKey: null,
      price: 500,
      orgaPrice: 500,
      categoryId: 8,
    },
  ];

  items = items.map((item) => ({
    ...item,
    available: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return Item.bulkCreate(items);
};

export default seedItems;
