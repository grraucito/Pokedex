<template>
  <h1>Pokedex Louncher</h1>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center" id="navHead">
      <li class="page-item ${previous === null ? 'disabled': ''}">
        <a
          class="page-link"
          href="#"
          @click="obtenerPokemon(previous)"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item ${next === null ? 'disabled': ''}">
        <a
          class="page-link"
          href="#"
          @click="obtenerPokemon(next)"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
  <div class="row" id="panelLits">
    <div
      class="col-sm-6 col-md-4 col-lg-3"
      v-for="item in items"
      :key="item.name"
    >
      <div class="card h-90 m-1 rounded">
        <div class="card-body">
          <h5 class="card-title">
            {{ item.name.replace(/^\w/, (c) => c.toUpperCase()) }}
          </h5>
        </div>
        <div class="card-body">
          <button
            type="button"
            class="btn btn-link"
            data-toggle="modal"
            data-target="#exampleModal"
            @click="buscarPokemon(item.url)"
          >
            Buscar Pokemon
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="pokemonName"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content bg-light">
        <div class="modal-header">
          <h5 class="modal-title" id="pokemonName">{{ pokemonName }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div>
              <div class="row">
                <div class="col-md-6 col-xs-12 col-sm-12">
                  <img
                    class="img-thumbnail rounded-circle w-100"
                    v-bind:src="pokeImg"
                    id="pokeImg"
                    alt="Card image cap"
                  />
                </div>
                <div class="col-md-6 col-xs-12 col-sm-12">
                  <div class="rounded frm-ability w-100">
                    <div class="row m-2">
                      <div class="col title">Altura</div>
                      <div class="col title">Habilidad</div>
                    </div>
                    <div class="row m-2">
                      <div class="col" id="dvAltura">{{ dvAltura }}</div>
                      <div class="col" id="dvHabilidad">{{ dvHabilidad }}</div>
                    </div>
                    <div class="row m-2">
                      <div class="col title">Peso</div>
                    </div>
                    <div class="row m-2">
                      <div class="col" id="dvPeso">{{ dvPeso }}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">Tipo</div>
                  </div>
                  <div class="row" id="dvTipo">
                    <div class="col-6" v-for="tipo in dvTipo" :key="tipo.slot">
                      <blockquote
                        class="blockquote text-center bg_${item.type.name}"
                        :class="[`bg_${tipo.type.name}`]"
                      >
                        <p class="mb-0">
                          {{
                            tipo.type.name.replace(/^\w/, (c) =>
                              c.toUpperCase()
                            )
                          }}
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" id="dvMoves">
                <div
                  class="col-md-3"
                  v-for="item in dvMoves"
                  :key="item.move.name"
                >
                  {{ item.move.name.replace(/^\w/, (c) => c.toUpperCase()) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: [],
      next: "",
      previous: "",
      pokemonName: "",
      pokeImg: "",
      dvAltura: "",
      dvPeso: "",
      dvHabilidad: [],
      dvTipo: [],
      dvMoves: [],
    };
  },
  methods: {
    async obtenerPokemon(url) {
      const res = await fetch(url);
      const { results, next, previous } = await res.json();
      this.items = [...results];
      this.next = next;
      this.previous = previous;
    },
    async buscarPokemon(url) {
      const res = await fetch(url);
      const {
        name,
        order,
        height,
        weight,
        sprites: { front_default },
        abilities,
        types,
        moves,
      } = await res.json();
      this.pokemonName = `${name.replace(/^\w/, (c) =>
        c.toUpperCase()
      )} - ${order}`;
      this.pokeImg = front_default;
      this.dvAltura = height;
      this.dvPeso = weight;
      this.dvHabilidad = abilities[0].ability.name.replace(/^\w/, (c) =>
        c.toUpperCase()
      );
      this.dvTipo = types;
      this.dvMoves = moves;
    },
  },
  created() {
    this.obtenerPokemon("https://pokeapi.co/api/v2/pokemon");
  },
};
</script>

<style>
@import url("./assets/styles/theme.css");
</style>