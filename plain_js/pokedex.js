const getAll = (url = `https://pokeapi.co/api/v2/pokemon`) => {
    fetch(url)
        .then((result) => {
            return result.json()
        })
        .then(data => {
            const { results, next, previous } = data
            const panelLits = document.getElementById("panelLits"),
                navHead = document.getElementById("navHead")
            let text = '';
            results.map(item => {
                text += `<div class="col-sm-6 col-md-4 col-lg-3">
                            <div class="card h-90 m-1 rounded">
                                <div class="card-body">
                                    <h5 class="card-title">${item.name.replace(/^\w/, (c) => c.toUpperCase())}</h5>
                                </div>
                                <div class="card-body">
                                    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#exampleModal" onclick="buscar('${item.url}')">
                                        Buscar Pokemon
                                    </button>
                                </div>
                            </div>
                        </div>`
            })
            panelLits.innerHTML = text
            navHead.innerHTML = `<li class="page-item ${previous === null ? 'disabled': ''}">
                                    <a class="page-link" href="#" onclick="getAll('${previous}')" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li class="page-item ${next === null ? 'disabled': ''}">
                                    <a class="page-link" href="#" onclick="getAll('${next}')" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span class="sr-only">Next</span>
                                    </a>
                                </li>`
        })
        .catch((err) => {
            console.log('err :>> ', err);
        });
}

getAll()

const buscar = (url) => {
    fetch(url)
        .then((result) => {
            return result.json()
        }).then((data) => {
            const { name, order, height, weight, sprites: { front_default }, abilities, types, moves } = data
            let type = '', movements = ''
            const pokemonName = document.getElementById("pokemonName"),
                pokeImg = document.getElementById("pokeImg"),
                dvAltura = document.getElementById("dvAltura"),
                dvPeso = document.getElementById("dvPeso"),
                dvHabilidad = document.getElementById("dvHabilidad"),
                dvTipo = document.getElementById("dvTipo"),
                dvMoves = document.getElementById("dvMoves")

            pokemonName.innerText = `${name.replace(/^\w/, (c) => c.toUpperCase())} N. ${order}`
            pokeImg.src = front_default
            dvAltura.innerHTML = height
            dvPeso.innerHTML = weight
            dvHabilidad.innerHTML = abilities[0].ability.name.replace(/^\w/, (c) => c.toUpperCase())
            types.map(item => {
                type += `<div class="col-6">
                <blockquote class="blockquote text-center bg_${item.type.name}">
                <p class="mb-0">${item.type.name.replace(/^\w/, (c) => c.toUpperCase())}</p>
              </blockquote>
              </div>`
            });
            dvTipo.innerHTML = type
            moves.map(item => movements += `<div class="col-md-3">
                                                ${item.move.name.replace(/^\w/, (c) => c.toUpperCase())}
                                            </div>`)
            dvMoves.innerHTML = movements

        }).catch((err) => {
            console.log('err', err)
        });
}

const fetchPokemon = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    fetch(url)
        .then((result) => {
            return result.json()
        })
        .then(data => {
            pokeImage(data.sprites.front_default)
        })
        .catch((err) => {

        });
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg")
    pokeImg.src = url
}

const imprimir = () => {
    const pokeName = document.getElementById('pokeName')
    let pokeInput = pokeName.value.toLowerCase()
    fetchPokemon(pokeInput)
}