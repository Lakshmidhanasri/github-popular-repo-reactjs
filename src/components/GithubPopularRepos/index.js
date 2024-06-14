import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiConstView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failuer: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    respositoryData: [],
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiConstView.initial,
  }

  componentDidMount() {
    this.getRepositoryData()
  }

  getRepositoryData = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiConstView.inprogress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl)
    console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.avatar_url,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
      }))
      this.setState({
        respositoryData: updatedData,
        apiStatus: apiConstView.success,
      })
    } else {
      this.setState({apiStatus: apiConstView.failuer})
    }
  }

  setActiveLanguageId = newFilterId => {
    this.setState({activeLanguageId: newFilterId}, this.getRepositoryData)
  }

  renderLangurList = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="list-container">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            languageFiltersDetails={eachItem}
            key={eachItem.id}
            setActiveLanguageId={this.setActiveLanguageId}
            isActive={eachItem.id === activeLanguageId}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFaiureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderRepositoryListView = () => {
    const {respositoryData} = this.state
    return (
      <ul className="respo-list">
        {respositoryData.map(eachItem => (
          <RepositoryItem respotioryDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderRepository = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstView.success:
        return this.renderRepositoryListView()
      case apiConstView.failuer:
        return this.renderFaiureView()
      case apiConstView.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        {this.renderLangurList()}
        {this.renderRepository()}
      </div>
    )
  }
}
export default GithubPopularRepos
