json.array!(@tasks) do |task|
  json.extract! task, :id, :name
  json.done_url done_task_path(task, format: :json)
end
