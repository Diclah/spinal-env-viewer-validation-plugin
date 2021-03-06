import {
  parameterGroup
} from "./parameterModel";

(function () {
  angular.module('app.spinalforge.plugin')
    .controller('parameterCtrl', ["$scope", "$rootScope", "$mdToast", "$mdDialog", "authService", "$compile", "$injector", "layout_uid", "spinalModelDictionary", "$q", "parametterService",
      function ($scope, $rootScope, $mdToast, $mdDialog, authService, $compile, $injector, layout_uid, spinalModelDictionary, $q, parametterService) {

        $scope.selectedAlert = null;
        $scope.referencial = null;
        $scope.selectedObject = null; // selection du group
        $scope.allParameter = []; // list de tous les paramettre associé au group

        parametterService.register(callback);

        function callback(mod, selectedObject) {
          if (mod) {
            $scope.selectedAlert = mod;
            if (selectedObject == null)
              $scope.selectedObject = mod;
            else
              $scope.selectedObject = selectedObject;
            if ($scope.selectedAlert.referencial) {
              $scope.selectedAlert = $scope.selectedAlert.referencial;
              $scope.referencial = $scope.selectedAlert.referencial;
            }

            $scope.allObject = mod.allObject;
            $scope.selectedObject.bind($scope.onModelChange);
          }
        }



        $scope.addParameter = (theme) => {

          $mdDialog.show($mdDialog.prompt()
              .title("Add attributes")
              .placeholder('Please enter the Name')
              .ariaLabel('Add attributes')
              .clickOutsideToClose(true)
              .required(true)
              .ok('Confirm').cancel('Cancel'))
            .then(function (result) {

              let newParameter = new parameterGroup();
              newParameter.name.set(result);
              newParameter.value.set(0);
              if (theme.parameter) {
                theme.parameter.push(newParameter);
              } else {
                theme.add_attr({
                  parameter: []
                });
                theme.parameter.push(newParameter);
              }
            }, () => {});
        };

        $scope.onModelChange = () => {
          $scope.allParameter = [];
          for (let i = 0; i < $scope.selectedObject.parameter.length; i++) {
            $scope.allParameter.push($scope.selectedObject.parameter[i]);
          }
        };

        $scope.deleteParameter = (parameter) => {
          for (let i = 0; i < $scope.selectedObject.parameter.length; i++) {
            const element = $scope.selectedObject.parameter[i];
            if (parameter.name.get() == element.name.get())
              $scope.selectedObject.parameter.splice(i, 1);
          }
        };

      }
      // end of controller
    ]);
})();