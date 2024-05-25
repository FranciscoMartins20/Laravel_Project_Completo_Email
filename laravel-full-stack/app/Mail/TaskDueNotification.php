<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TaskDueNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $task;
    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($task, $user)
    {
        $this->task = $task;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.task_due_notification')
                    ->with([
                        'task' => $this->task,
                        'user' => $this->user,
                    ]);
    }
}
