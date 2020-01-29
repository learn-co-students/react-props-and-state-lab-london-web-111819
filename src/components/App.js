import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  
  BASE_URL = '/api/pets'

  // constructor() {
  //   super()

  //   this.state = {
  //     pets: [],
  //     filters: {
  //       type: 'all'
  //     }
  //   }
  // }

  state = {
    pets: [],
    filters: {
      type: 'all'
    }
  }

  updateStatePetsArray = (arrayInput) => {
    this.setState({
      ...this.state,
      pets: arrayInput
    })
  }

  handleFindPets = () => {
    //TODO: Fetch a list of pets using fetch
    {
      this.state.filters.type === 'all' 
      ? fetch(this.BASE_URL).then(object=>object.json()).then(this.updateStatePetsArray)
      : fetch(`${this.BASE_URL}?type=${this.state.filters.type}`).then(object=>object.json()).then(this.updateStatePetsArray)
    }
  }

  handleAdoptPet = (receivedId) => {
    console.log(receivedId) //Works!
    //Find the pet with the id from the array of pets (which is in state)
    const targetPetObject = this.state.pets.find(item=>{return(item.id===receivedId)}) //Works
    const indexOfTargetPet = this.state.pets.indexOf(targetPetObject) //Works
    console.log(indexOfTargetPet)
    this.setState({
      ...this.state,
      pets: this.state.pets.map((item,index)=>index!==indexOfTargetPet ?item :{...item,isAdopted:true})
    })
  }

  handleChangeType = (newType) => {
    this.setState({
      filters: {
        type: newType
      }
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
              <Filters onFindPets={this.handleFindPets} onChangeType={this.handleChangeType} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
