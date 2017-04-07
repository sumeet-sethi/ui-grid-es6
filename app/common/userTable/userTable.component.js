class UserTableController {
    constructor($scope) {
        var vm = this;
        this.$scope = $scope;
        vm.gridApi = null;
        vm.gridOptions = {
            columnDefs: [
                { name: 'Team', field: 'team', headerTooltip: true, cellTooltip: true },
                { name: 'User', field: 'userName', headerTooltip: true, cellTooltip: true },
                { name: 'Zone Name', field: 'zoneName', headerTooltip: true, cellTooltip: true },
                { name: 'Zone Type', field: 'zoneType', headerTooltip: true, cellTooltip: true },
                { name: 'Zone Expiry', field: 'zoneExpiry', headerTooltip: true, cellTooltip: true },
                { name: 'Note', field: 'note', headerTooltip: true, cellTooltip: true }
            ],
            data: [],
            enableGridMenu: true,
            enableSorting: true,
            enableFiltering: true,
            showTreeExpandNoChildren: true,
            enableVerticalScrollbar: 1,
            enableHorizontalScrollbar: 0,
            enableSelectAll: true,
            minRowsToShow: 10,
            exporterCsvFilename: 'UserList.csv',
            onRegisterApi: (gridApi) => {
                this.gridApi = gridApi;
                this.gridApi.grid.registerDataChangeCallback(() => {
                    this.gridApi.treeBase.expandAllRows();
                });
            }
        };

        this.$onInit = () => {
            this.prepareGridData(this.data.gridData);
        };

        this.$onChanges = (changesObj) => {
            this.prepareGridData(changesObj.data.currentValue.gridData);
        };

        this.$onDestroy = () => {
            this.gridOptions.data = [];
        };
    }

    prepareGridData(gridData) {
        if (!_.isUndefined(gridData) && (gridData.length > 0)) {
            let flattenedData = this.flattenGridData(gridData);
            _.forEach(gridData, (objectLevel0) => {
                if (_.has(objectLevel0, 'userList')) {
                    objectLevel0.$$treeLevel = 0;
                    _.forEach(objectLevel0.userList, (objectLevel1) => {
                        if (_.has(objectLevel1, 'zoneList')) {
                            objectLevel1.$$treeLevel = 1;
                        }
                    });
                }
            });
            this.gridOptions.data = flattenedData;
        }
    }

    flattenGridData(gridData) {
        let flattenedData = [];
        for (let i = 0; i < gridData.length; i++) {
            flattenedData.push(gridData[i]);
            let userList = gridData[i].userList;
            for (let j = 0; j < userList.length; j++) {
                flattenedData.push(userList[j]);
                let zoneList = gridData[i].userList[j].zoneList;
                for (let k = 0; k < zoneList.length; k++) {
                    flattenedData.push(zoneList[k]);
                }
            }
        }
        return flattenedData;
    }
}

UserTableController.$inject = ['$scope'];

const userTableComponentConfig = {
    bindings: {
        data: '<'
    },
    templateUrl: require("./userTable.html"),
    controller: UserTableController,
};

export default userTableComponentConfig;