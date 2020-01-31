import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
 
  state = {
      pets: [],
      filters: {
        type: 'all'
      }
  }

  adoptPet = (petId) => {

    //long version of not destructively changing original array of json
    const pets = [...this.state.pets]
    const petToChange = pets.find(pet => pet.id === petId)
    const CopyOfpetToChange = {...petToChange}
    CopyOfpetToChange.isAdopted = true 
    const indexToSwap = pets.indexOf(petToChange)
    pets[indexToSwap] = CopyOfpetToChange
    
    this.setState({ pets: pets})
  }

  getPets = () => {
    const url = this.state.filters.type === 'all' 
    ? '/api/pets'
    : `/api/pets?type=${this.state.filters.type}`

    fetch(url)
    .then(resp => resp.json())
    .then(pets => this.setState({pets: pets}))
    
  }

  updateFilter = (e) => { //use spread operator when setting state, incase theres more stuff in there that we dont want to use/lose/change
    this.setState({ filters: {...this.state.filters,
      type: e.target.value}})
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
              <Filters updateFilter={this.updateFilter} getPets={this.getPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
