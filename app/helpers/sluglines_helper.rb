module SluglinesHelper
  # Set color for slugline's line
  def set_line_color(slugline)
    case slugline.line
      when "Springfield/Lorton Lines"
        return "#ffff00"
      when "Woodbridge/Dale City"
        return "#cd6090"
      when "Stafford Lines"
        return "#f08080"
      when "Fredericksburg Lines"
        return "#8470ff"
      when "I-66/Manassas Lines"
        return "#5d478b"
      when "Washington DC Lines"
        return "#3cb371"
      else
        return "grey"
    end
  end
end
