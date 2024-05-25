<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use App\Mail\TaskDueNotification;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'status', 'due_date', 'user_id'];

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($task) {
            
            if ($task->isDirty('status') && $task->status == 'Finalizado') {
                $user = $task->user; 
                Mail::to($user->email)->send(new TaskDueNotification($task, $user));
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
