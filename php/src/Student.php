<?php namespace MyApp;

class Student{   
    public $name;
    public $study;
    public $food;

    public function __construct(){ // 가장 초기에 실행되는 값
        $this->food = "햄버거";
        $this->name = "윤지환";
        $this->study = "PHP";
    }

    // static method
    public static function factory()
    {
        return new Student;
    }

    public function say_hello()
    {
        echo "내 이름은{$this->name} 이야 반가웝"; 
    }

    public function say_food()
    {
        echo "내 이름은{$this->food} 이야 반가웝"; 
    }

    public function say_study()
    {
        echo "내 이름은{$this->study} 이야 반가웝"; 
    }

    public function say_dd(){
        $this->say_food(); 
    }


}
?>

