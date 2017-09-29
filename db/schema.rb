# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170929142132) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "sluglines", force: :cascade do |t|
    t.string "name"
    t.boolean "is_morning"
    t.string "line"
    t.text "location"
    t.text "description"
    t.decimal "latitude", precision: 8, scale: 6
    t.decimal "longitude", precision: 8, scale: 6
    t.string "best_hours"
    t.text "good_hours"
    t.text "destinations", default: [], array: true
    t.text "returning_stations", default: [], array: true
    t.text "driver_note"
    t.text "parking_tip"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
