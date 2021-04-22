import React, { Component } from 'react';
import autoBind from "react-autobind";
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { findEndpoint } from './service';
import { debounce } from 'lodash';
import { withRouter } from 'react-router';
import { SearchSymbol } from './components/SearchSymbol';
import { Loading } from './components/Loading';
import { OrganizationList } from './components/OrganizationList';

class MarketPage extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.searchOrganization = debounce(this.searchOrganization.bind(this), 250);
        this.state = {
            symbol: "",
            organizations: [],
            loading: false
        }
    }

    componentDidUpdate(_, prevState) {
        if (prevState.symbol !== this.state.symbol) {
            this.searchOrganization();
        }
    }

    searchOrganization() {
        this.setState({ loading: true });
        findEndpoint(this.state.symbol,
            (organizations) => {
                console.log(organizations)
                this.setState({ organizations, loading: false })
            });
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <Card
                        className="p-shadow-24"
                        title="Get summary"
                        subTitle="Enter a symbol and get a little summary of him">
                        <div className="p-fluid">
                            <SearchSymbol
                                onChange={event => this.setState({ symbol: event.target.value })}
                                value={this.state.symbol}
                                onSearchOrganization={this.searchOrganization}
                            />
                        </div>
                    </Card>
                    {this.state.symbol && (
                        <>
                            {/* <div className="p-m-6" /> */}
                            <Divider align="center" type="dashed">
                                <b>Result of search</b>
                            </Divider>
                            <Card className="p-shadow-24">
                                {this.state.loading ? (
                                    <div className="p-fluid">
                                        <Loading />
                                    </div>
                                ) : (
                                    <OrganizationList
                                        organizations={this.state.organizations}
                                        history={this.props.history}
                                    />
                                )}
                            </Card>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(MarketPage);
