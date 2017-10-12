class CreateListings < ActiveRecord::Migration[5.1]
  def change
    create_table :listings do |t|
      t.string  :title
      t.string  :price
      t.string  :date
      t.string  :link
      t.integer :scrape_id

      t.timestamps
    end
  end
end
