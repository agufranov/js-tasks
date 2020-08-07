import React from 'react'

const api = {
  /**
   * This method must be called when user clicks the "purchase" button
   */
  purchase: async () => {
    // an errror may be thrown
    // throw new Error("Request error")

    return 42
  }
}

enum PurchaseResult {
	NONE,
  SUCCESS,
  ERROR
}

class Purchase extends React.Component {
	state = {
  	outcome: PurchaseResult.NONE
  };
  
	async purchase() {
  	try {
    	await api.purchase();
      this.setState({ outcome: PurchaseResult.SUCCESS });
    } catch (err) {
    	this.setState({ outcome: PurchaseResult.ERROR });
    }
  }
  
  render() {
  	const { outcome } = this.state;
    return (
      <div>
        <button onClick={this.purchase}>Purchase</button>
        { outcome === PurchaseResult.SUCCESS && <p className="successText">Purchase completed!</p> }
        { outcome === PurchaseResult.ERROR && <p className="errorText">An error occurred!</p> }
      </div>
    )
  }
}

export default Purchase
