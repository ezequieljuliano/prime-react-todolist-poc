import React, { Component } from 'react';

import autoBind from "react-autobind";
import { withRouter } from 'react-router';
import { findCompanyOverview, findEarnings } from './service';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Skeleton } from 'primereact/skeleton';
import { Chart } from 'primereact/chart';
import { chartOptions } from '../../utilities/constants';
import { formatDateISOToDate } from '../../utilities/formatters';

class MarketDetailPage extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            overviewLoading: false,
            earningLoading: false,
            overview: {},
            dataAnnualEarningChart: {},
            dataQuarterlyEarningChart: {}
        }
    }

    componentDidMount() {
        const symbol = new URLSearchParams(this.props.location.search).get("symbol");
        if (symbol) {
            this.searchOverview(symbol);
            this.searchEarnings(symbol);
        }
    }

    searchEarnings(symbol) {
        this.setState({ earningLoading: true })
        findEarnings(symbol, earning => {
            const dataAnnualEarningChart = {
                labels: earning.annualEarnings?.map(earn => formatDateISOToDate(earn.fiscalDateEnding)).reverse(),
                datasets: [
                    {
                        label: "Earning Per Share",
                        data: earning.annualEarnings?.map(earn => earn.reportedEPS).reverse(),
                        borderColor: "#8dd0ff",
                        backgroundColor: "#8dd0ff20"
                    }
                ]
            };
            const dataQuarterlyEarningChart = {
                labels: earning.quarterlyEarnings?.map(earn => formatDateISOToDate(earn.fiscalDateEnding)).reverse(),
                datasets: [
                    {
                        label: "Earning Per Share",
                        data: earning.quarterlyEarnings?.map(earn => earn.reportedEPS).reverse(),
                        borderColor: "#8dd0ff",
                        backgroundColor: "#8dd0ff20"
                    },
                    {
                        label: "Earning Per Share",
                        data: earning.quarterlyEarnings?.map(earn => earn.estimatedEPS).reverse(),
                        borderColor: "#E46F56",
                        backgroundColor: "#E46F5620"
                    }
                ]
            };
            this.setState({
                dataAnnualEarningChart,
                dataQuarterlyEarningChart,
                earningLoading: false
            })
        })
    }

    searchOverview(symbol) {
        this.setState({ overviewLoading: true })
        findCompanyOverview(symbol, overview => {
            this.setState({ overview, overviewLoading: false });
        })
    }

    getTitleCard() {
        <div className="p-d-flex p-jc-between">
            <div>{this.state.overview?.Name}</div>
            <div>{this.state.overview?.Symbol}</div>
        </div>
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <Card
                        className="p-shadow-24 p-mb-3"
                        title={this.getTitleCard()}
                        subTitle={`${this.state.overview?.Industry} - ${this.state.overview?.AssetType}`}>
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p field p-col-12 p-m-0">
                                <Divider align="center" type="dashed" className="p-mt-0">
                                    <b>Description</b>
                                </Divider>
                                {this.state.overviewLoading ?
                                    <Skeleton width="100%" height="150px" /> :
                                    <p>{this.state.overview?.Description}</p>
                                }
                                <Divider type="dashed" className="p-m-0" />
                            </div>
                        </div>
                    </Card>
                    <Card
                        className="p-shadow-24 p-mb-3"
                        title="Annual Earnings"
                        subTitle="Quotient that serves as an indicator of the profitability of organization (Earnings Per Share - EPS)."
                    >
                        {this.earningsLoading ? (
                            <Skeleton width="100%" height="366px" />
                        ) : (
                            <Chart
                                type="line"
                                data={this.state.dataAnnualEarningChart}
                                options={chartOptions}
                            />
                        )}
                    </Card>
                    <Card
                        className="p-shadow-24 p-mb-3"
                        title="Quarterly Earnings"
                        subTitle="Quotient that serves as an indicator of the profitability of organization (Earnings Per Share - EPS)."
                    >
                        {this.earningsLoading ? (
                            <Skeleton width="100%" height="366px" />
                        ) : (
                            <Chart
                                type="line"
                                data={this.state.dataQuarterlyEarningChart}
                                options={chartOptions}
                            />
                        )}
                    </Card>
                </div>
            </div>
        );
    }
}

export default withRouter(MarketDetailPage);
