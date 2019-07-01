import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      ...this.state.pets,
      filters: {
        type: event.target.value
      }
    })
  }

  handleClick = () => {
    console.log(this.state.filters.type)
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
      .then(results => results.json())
      .then(data => this.setState({
        pets: data,
        ...this.state.filters
      }))
      .then(data => console.log(this.state))

    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(results => results.json())
      .then(data => this.setState({
        pets: data,
        ...this.state.filters
      }))
      .then(data => console.log(this.state))

    }
  }

  onAdoptPet = (id) => {
    const i = this.state.pets.findIndex((pet) => {return pet.id === id} )

    const updatedPets = [...this.state.pets]

    updatedPets[i].isAdopted = true

    this.setState({
      pets: updatedPets,
      ...this.state.filter
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChange} onFindPetsClick={this.handleClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
