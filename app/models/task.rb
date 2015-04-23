# -*- coding: utf-8 -*-
class Task < ActiveRecord::Base
  def priority_label
    return "高" if priority > 0
    return "低" if priority < 0
    "中"
  end

  def high
    update(priority: 1);
  end

  def low
    update(priority: -1);
  end

  def middle
    update(priority: 0);
  end
end
