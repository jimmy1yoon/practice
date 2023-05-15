<?php namespace MyApp;

use DI\ContainerBuilder; 
use Slim\Factory\AppFactory;

class Container {
	protected $_container;

	const autoAliases = [
		'student'=>student::class,
		'person'=>person::class,
	];

	public function __construct() {
		$builder = new ContainerBuilder(); // 인스턴스 생성
		foreach(static::autoAliases as $alias=>$clsName) {
			$builder->addDefinitions([$alias=>\DI\get($clsName)]);
		} // foreach 문을 통해 클래스 이름을 builder 에 추가 
		$this->_container = $builder->build(); 
		// container 인스턴스에 builder->build() 함수 결과 값 저장
		AppFactory::setContainer($this->_container);

		// run default - 초기화해준다. 
		// $this->_container->get('database')->init();
	}

	public function __get($name) {
		assert($this->_container->has($name), "$name had not set");
		return $this->_container->get($name);
	}

	public function __set($name, $value) {
		assert(!$this->_container->has($name), "$name already set");
		return $this->_container->set($name, $value);
	}

	public function __call($name, $params) {
		return $this->_container->$name(...$params);
	}

}