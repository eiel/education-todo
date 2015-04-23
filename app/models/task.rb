# -*- coding: utf-8 -*-
class Task < ActiveRecord::Base
  def priority_label
    return "高" if priority > 0
    return "低" if priority < 0
    "中"
  end
end
