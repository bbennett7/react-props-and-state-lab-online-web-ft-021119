import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  render() {

    let num = 0

    const pets = this.props.pets.map((pet) => <Pet key={num += 1} pet={pet} onAdoptPet={this.props.onAdoptPet} />)

    return (
      <div className="ui cards">
        {pets}
      </div>
    )
  }
}

export default PetBrowser
