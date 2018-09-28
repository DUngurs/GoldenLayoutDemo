
        /***************************
              * Flight List Component
              ***************************/
        var FlightList = React.createClass({ displayName: 'FlightList',
            getInitialState: function getInitialState() {
                return { flights: [
                    { name: 'LATVIA -> CROATIA', startX: 1100, startY: 620, positionX: 700, positionY: 800, rotate: 'rotate(45deg)'},
                    { name: 'LATVIA -> SPAIN', startX: 1100, startY: 620, positionX: 1000, positionY: 500, rotate: 'rotate(325deg)'},
                    { name: 'LATVIA -> FRANCE', startX: 1100, startY: 620, positionX: 600, positionY: 100, rotate: 'rotate(70deg)'},
                    { name: 'LATVIA -> ITALY', startX: 1100, startY: 620, positionX: 500, positionY: 900, rotate: 'rotate(250deg)'},
                    { name: 'LATVIA -> DENMARK', startX: 1100, startY: 620, positionX: 600, positionY: 700, rotate: 'rotate(140deg)'}] };

            },
            render: function render() {
                var eventHub = this.props.glEventHub;
                return (
                    React.createElement('ul', { className: 'flightlist' },
                        this.state.flights.map(function (flight) {
                            return React.createElement(Flight, {
                                key: flight.name,
                                flightData: flight,
                                glEventHub: eventHub });
                        })));
            } });


        /***************************
            * Flights Component
            ***************************/
        var Flight = React.createClass({ displayName: 'Flights',
            getInitialState: function getInitialState() {
                return this.props.flightData;
            },
            selectFlight: function selectFlight() {
                this.props.glEventHub.emit('flight-select', this.state);
            },
            render: function render() {
                return (
                    React.createElement('li', { onClick: this.selectFlight }, this.state.name));
            } });

        /***************************
               * Flight Map Component
               ***************************/

        var FlightMap = React.createClass({ displayName: 'Flight map',
            componentWillMount: function componentWillMount() {
                this.props.glEventHub.on('flight-select', this.selectFlight);
            },
            componentWillUnmount: function componentWillUnmount() {
                this.props.glEventHub.off('flight-select', this.selectFlight);
            },
            selectFlight: function selectFlight(flightData) {
                this.setState(flightData);
            },
            render: function render() {
                if (this.state) {
                    return (
                        React.createElement('div', { className: 'flightMaps' },
					        React.createElement('img', { src: '../resources/map.jpg', width: '2000', height: '1300' }),
                            React.createElement('img', { className: 'planeImg',
                                                            style: { top: this.state.positionX, left: this.state.positionY, transform: this.state.rotate},
                                                            src: '../resources/plane.png',
                                                            width: '30',height: '30'})

                                                            ));
                } else {
                    return React.createElement('div', { className: 'flightMaps' },
					        React.createElement('img', { src: '../resources/map.jpg', width: '2000', height: '1300' }));
                }
            } });


        /***************************
               * GoldenLayout Init
               ***************************/
        var config = {
            content: [{
                type: 'row',
                content: [{
                    width: 10,
                    title: 'Flights',
                    type: 'react-component',
                    component: 'flight-list' },
                {
                    title: 'Flight map',
                    type: 'react-component',
                    component: 'flight-map' }] }] };

        var myLayout = new GoldenLayout(config);
        myLayout.registerComponent('flight-list', FlightList);
        myLayout.registerComponent('flight-map', FlightMap);

        myLayout.init();
