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

  onChangeType = (selectedType) => {
    this.setState({
      filters: {
        type: selectedType
      }
    })
  }

  onFindPetsClick = () =>
    {
      const baseUrl ='/api/pets'
      const type = this.state.filters.type
      
      if(type === 'all'){
        return fetch(baseUrl)
        .then (response => response.json())
        .then (pets => this.updatePets(pets))
      }else{
        return fetch(baseUrl+`?type=${type}`)
        .then (response => response.json())
        .then (pets => this.updatePets(pets))
      }
    }

  updatePets = (pets) => {
    this.setState({
      pets: pets
    })
  }

  onAdoptPet = (id) => {
    const selectedPet = this.state.pets.filter(pet => pet.id = id)
  
    selectedPet[0].isAdopted = true
   
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
              <Filters onChangeType = {this.onChangeType}
                       onFindPetsClick = {this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets = {this.state.pets}
                          type = {this.state.filters.type}
                          onAdoptPet = {this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
