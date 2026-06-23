import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ color: 'red', padding: 40, fontFamily: 'monospace', background: '#030014', minHeight: '100vh' }}>
          <h1>Erro detectado:</h1>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: 16, color: '#ff6b6b' }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
