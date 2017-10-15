module SluglinesHelper
  # Set color for slugline's line
  def set_line_color(slugline)
    case slugline.line
      when "Springfield/Lorton Lines"
        return "gold"
      when "Woodbridge/Dale City"
        return "SteelBlue"
      when "Stafford Lines"
        return "orange"
      when "Fredericksburg Lines"
        return "Crimson"
      when "I-66/Manassas Lines"
        return "DarkCyan "
      when "Washington DC Lines"
        return "MediumSeaGreen "
      else
        return "grey"
    end
  end
end
