export const MENU_ITEMS = {
  Anatomia: {
    label: 'Anatomia',
    icon: 'anatomia-icon',
    hasSubmenu: true,
    children: {
      'Dente e Estruturas Anexas': {
        label: 'Dente e Estruturas Anexas',
        icon: 'estruturas-icon',
        hasSubmenu: true,
        children: {
          Esmalte: {
            label: 'Esmalte',
            icon: 'esmalte-icon',
            hasSubmenu: false,
          },
          Dentina: {
            label: 'Dentina',
            icon: 'dentina-icon',
            hasSubmenu: false,
          },
          Cemento: {
            label: 'Cemento',
            icon: 'cemento-icon',
            hasSubmenu: false,
          },
          'Câmara pulpar e canal radicular': {
            label: 'Câmara pulpar e canal radicular',
            icon: 'camara-icon',
            hasSubmenu: false,
          },
          'Espaço do Ligamento periodontal': {
            label: 'Espaço do Ligamento periodontal',
            icon: 'espaco-icon',
            hasSubmenu: false,
          },
          'Cortical Alveolar': {
            label: 'Cortical Alveolar',
            icon: 'cortical-icon',
            hasSubmenu: false,
          },
          'Crista Óssea': {
            label: 'Crista Óssea',
            icon: 'crista-icon',
            hasSubmenu: false,
          },
          Maxila: {
            label: 'Maxila',
            icon: 'maxila-icon',
            hasSubmenu: true,
            children: {
              'Sutura Intermaxilar': {
                label: 'Sutura Intermaxilar',
                icon: 'sutura-icon',
                hasSubmenu: false,
              },
              'Forame Incisivo': {
                label: 'Forame Incisivo',
                icon: 'forame-icon',
                hasSubmenu: false,
              },
              'Cavidade Nasal': {
                label: 'Cavidade Nasal',
                icon: 'cavidade-icon',
                hasSubmenu: true,
                children: {
                  'Septo Nasal': {
                    label: 'Septo Nasal',
                    icon: 'septo-icon',
                    hasSubmenu: false,
                  },
                  'Espinha Nasal anterior': {
                    label: 'Espinha Nasal anterior',
                    icon: 'espinha-icon',
                    hasSubmenu: false,
                  },
                  'Ápice do Nariz': {
                    label: 'Ápice do Nariz',
                    icon: 'apice-icon',
                    hasSubmenu: false,
                  },
                  Narinas: {
                    label: 'Narinas',
                    icon: 'narinas-icon',
                    hasSubmenu: false,
                  },
                },
              },
            },
          },
          Mandíbula: {
            label: 'Mandíbula',
            icon: 'mandibula-icon',
            hasSubmenu: true,
            children: {
              'Protuberância Mentual': {
                label: 'Protuberância Mentual',
                icon: 'protuberancia-icon',
                hasSubmenu: false,
              },
              'Fosseta Mentoniana': {
                label: 'Fosseta Mentoniana',
                icon: 'fosseta-icon',
                hasSubmenu: false,
              },
              'Espinhas Mentonianas': {
                label: 'Espinhas Mentonianas',
                icon: 'espinhas-icon',
                hasSubmenu: false,
              },
            },
          },
          Panorâmica: {
            label: 'Panorâmica',
            icon: 'panoramica-icon',
            hasSubmenu: false,
          },
        },
      },
    },
  },
  Patologia: {
    label: 'Patologia',
    icon: 'patologia-icon',
    hasSubmenu: true,
    children: {
      Cárie: {
        label: 'Cárie',
        icon: 'carie-icon',
        hasSubmenu: true,
        children: {
          'Lesão de Cárie Proximal': {
            label: 'Lesão de Cárie Proximal',
            icon: 'proximal-icon',
            hasSubmenu: false,
          },
          'Lesão de Cárie Oclusal': {
            label: 'Lesão de Cárie Oclusal',
            icon: 'occlusal-icon',
            hasSubmenu: false,
          },
          'Lesão de Cárie de Face Livre': {
            label: 'Lesão de Cárie de Face Livre',
            icon: 'face-livre-icon',
            hasSubmenu: false,
          },
        },
      },
      'Doenças do Periapice': {
        label: 'Doenças do Periapice',
        icon: 'periapice-icon',
        hasSubmenu: true,
        children: {
          Pericementite: {
            label: 'Pericementite',
            icon: 'pericementite-icon',
            hasSubmenu: false,
          },
          'Abscesso periapical crônico': {
            label: 'Abscesso periapical crônico',
            icon: 'abscesso-icon',
            hasSubmenu: false,
          },
          'Granuloma periapical': {
            label: 'Granuloma periapical',
            icon: 'granuloma-icon',
            hasSubmenu: false,
          },
        },
      },
      'Doenças do Periodonto': {
        label: 'Doenças do Periodonto',
        icon: 'periodonto-icon',
        hasSubmenu: true,
        children: {
          'Cálculo dentário': {
            label: 'Cálculo dentário',
            icon: 'calculo-icon',
            hasSubmenu: false,
          },
          'Perda Óssea Angular': {
            label: 'Perda Óssea Angular',
            icon: 'perda-ossea-angular-icon',
            hasSubmenu: false,
          },
          'Perda Óssea horizontal': {
            label: 'Perda Óssea horizontal',
            icon: 'perda-ossea-horizontal-icon',
            hasSubmenu: false,
          },
        },
      },
    },
  },

  'Alterações Dentárias': {
    label: 'Alterações Dentárias',
    icon: 'alteracoes-icon',
    hasSubmenu: true,
    children: {
      'Alterações de Número': {
        label: 'Alterações de Número',
        icon: 'numero-icon',
        hasSubmenu: true,
        children: {
          Agenesia: {
            label: 'Agenesia',
            icon: 'agenesia-icon',
            hasSubmenu: false,
          },
          'Dente Supranumerário': {
            label: 'Dente Supranumerário',
            icon: 'supranumerario-icon',
            hasSubmenu: false,
          },
        },
      },
      'Alterações de Tamanho': {
        label: 'Alterações de Tamanho',
        icon: 'tamanho-icon',
        hasSubmenu: true,
        children: {
          Microdontia: {
            label: 'Microdontia',
            icon: 'microdontia-icon',
            hasSubmenu: false,
          },
          Macrodontia: {
            label: 'Macrodontia',
            icon: 'macrodontia-icon',
            hasSubmenu: false,
          },
        },
      },
      'Alterações de Forma': {
        label: 'Alterações de Forma',
        icon: 'forma-icon',
        hasSubmenu: true,
        children: {
          Geminação: {
            label: 'Geminação',
            icon: 'geminacao-icon',
            hasSubmenu: false,
          },
          Fusão: {
            label: 'Fusão',
            icon: 'fusao-icon',
            hasSubmenu: false,
          },
          Concrescência: {
            label: 'Concrescência',
            icon: 'concrescencia-icon',
            hasSubmenu: false,
          },
        },
      },
    },
  },
};
