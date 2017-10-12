class CreateScrapes < ActiveRecord::Migration[5.1]
  def change
    create_table :scrapes do |t|
      t.string :scrape_type

      t.timestamps
    end
  end
end
