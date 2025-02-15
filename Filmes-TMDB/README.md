# Busca de Filmes TMDB

## Descrição

Desenvolva um aplicativo em React Native que permita ao usuário pesquisar filmes utilizando a API do The Movie Database (TMDB). O aplicativo deve oferecer uma interface para busca, exibir uma lista dos filmes encontrados e permitir que o usuário visualize detalhes de um filme selecionado.

## Passo a Passo

### Cadastro e Configuração da API

1. Acesse [TMDB API](https://www.themoviedb.org/) e crie uma conta para obter sua chave de API (API Key).
2. Armazene essa chave de forma segura no seu projeto (por exemplo, utilizando variáveis de ambiente).

### Tela de Busca

- Crie uma interface com um campo de texto para o usuário inserir o nome do filme desejado.
- Adicione um botão que, ao ser pressionado, inicia a busca utilizando o texto informado.

### Requisição à API TMDB

- Utilize o endpoint `/search/movie` da API TMDB para realizar a busca.
- Exemplo de URL:
  ```sh
  https://api.themoviedb.org/3/search/movie?api_key=SUA_API_KEY&query=nomeDoFilme
  ```
- Realize a requisição utilizando `fetch` ou uma biblioteca como `axios`.

### Exibição dos Resultados

- Exiba os filmes retornados em uma lista, mostrando informações como título, data de lançamento e uma breve sinopse.
- Utilize componentes como `FlatList` para exibir a lista de forma otimizada.

### Tela de Detalhes do Filme

- Ao selecionar um filme da lista, navegue para uma tela de detalhes que exiba informações adicionais (ex.: descrição completa, avaliação, poster, etc.).
- Utilize o endpoint `/movie/{movie_id}` para obter detalhes específicos do filme selecionado.

### Feedback Visual e Tratamento de Erros

- Mostre um indicador de carregamento enquanto os dados estão sendo buscados.
- Caso a busca não retorne resultados ou ocorra um erro na requisição, exiba mensagens de erro apropriadas para o usuário.

## Boas Práticas

- Utilize componentes funcionais e hooks (`useState`, `useEffect`) para gerenciar o estado e os efeitos colaterais.
- Mantenha o código modularizado, separando a lógica de requisição da apresentação dos dados.
- Considere a implementação de paginação ou carregamento incremental, se a API retornar muitos resultados.

## Considerações Finais

- **Documentação**: Consulte a [documentação oficial da API TMDB](https://developer.themoviedb.org/reference/intro) para entender melhor os parâmetros e o formato dos dados retornados.
- **Segurança**: Nunca exponha sua API Key diretamente no código-fonte de produção; utilize variáveis de ambiente ou outros mecanismos seguros.
- **UI/UX**: Invista na usabilidade e na experiência do usuário, garantindo que o aplicativo seja responsivo e intuitivo.
