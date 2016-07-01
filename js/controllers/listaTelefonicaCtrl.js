app.controller("listaTelefonicaCtrl", function($scope, uppercaseFilter, $http){
  $scope.app = "Lista Telefonica";
  $scope.contatos = [];
  // $scope.contatos = [
  //   {nome: uppercaseFilter("Roberto"), telefone:99998888, data: new Date(),operadora: {nome: "Oi", codigo:14,categoria:"Celular"} },
  //   {nome: 'Ana', telefone:99998877, data: new Date(), operadora: {nome: "Tim", codigo:41,categoria:"Celular"}  },
  //   {nome: 'Maria', telefone:99998866, data: new Date(), operadora: {nome: "GVT", codigo:12,categoria:"Fixo"} }
  // ];
  $scope.operadoras = [];
  var carregarContatos = function (){
    $http.get('http://localhost:3000/contatos')
    .success(function(data){
      $scope.contatos = data;
    }).error(function(data){
      $scope.message = "Aconteceu um problema: " + data;
    });
  };
  var carregarOperadoras = function(){
    $http.get('http://localhost:3000/operadoras')
    .success(function(data){
      $scope.operadoras = data;
    })
  }
  $scope.adicionarContato = function (contato) {
    contato.data = new Date();
    $http.post("http://localhost:3000/contatos",contato)
    .success(function(data){
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
      carregarContatos();
    });
    // $scope.contatos.push(angular.copy(contato));

  };
  $scope.apagarContato = function (contatos){
    $scope.contatos =  contatos.filter(function (contato) {
      if (!contato.selecionado) return contato;
    });
  };
  $scope.isContatoSelecionado = function (contatos){
     return contatos.some(function (contato){
      return contato.selecionado;
    });
  };
  $scope.ordenarPor = function (campo){
    $scope.criterioDeOrdenacao = campo;
    $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
  };
  carregarContatos();
  carregarOperadoras();

});
