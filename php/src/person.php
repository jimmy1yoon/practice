<?php namespace MyApp;


class person
{
    private $student;

    public function __construct(Student $student)
    {
        $this->student = $student;
    }

    public function choose(){
        // The user just registered, we create his account
        // ...

        // We send him an email to say hello!
        $this->student->say_hello();
    }
}

?>