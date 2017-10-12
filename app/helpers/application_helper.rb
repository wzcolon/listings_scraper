module ApplicationHelper
  def formatted_time(time_with_zone)
    parsed_time = Time.zone.parse(time_with_zone.to_s)
    parsed_time.to_formatted_s(:long)
  end
end
