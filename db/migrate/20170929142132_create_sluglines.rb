class CreateSluglines < ActiveRecord::Migration[5.1]
  def change
    create_table :sluglines do |t|
      t.string :name
      t.boolean :is_morning
      t.string :line
      t.text :location
      t.text :description
      t.decimal :latitude, precision: 8, scale: 6
      t.decimal :longitude, precision: 8, scale: 6
      t.string :best_hours
      t.text :good_hours
      t.text :destinations, default: [], array: true
      t.text :returning_stations, default: [], array: true
      t.text :driver_note
      t.text :parking_tip
      t.text :note

      t.timestamps
    end
  end
end
