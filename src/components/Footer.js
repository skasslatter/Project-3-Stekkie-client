import "../stylesheets/footer.css"

import React from 'react';

export default class Footer extends React.Component {
    render(){
        return (
            <footer id="sticky-footer">
            <div className="bottom section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="copyright">
                                <p>© Copyright Yvana and Sybille. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        )
    }
}