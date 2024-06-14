// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {respotioryDetails} = props
  const {name, imageUrl, starsCount, forksCount, issuesCount} =
    respotioryDetails

  return (
    <li className="repository-item">
      <img src={imageUrl} alt={name} className="repository-image" />
      <h1 className="repository-name">{name}</h1>
      <div className="status_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
          className="status-icon"
        />
        <p className="status-text">{starsCount}</p>
      </div>
      <div className="status_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="status-icon"
        />
        <p className="status-text">{forksCount}</p>
      </div>
      <div className="status_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="status-icon"
        />
        <p className="status-text">{issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
