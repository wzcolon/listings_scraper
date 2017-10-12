class Listing < ApplicationRecord
  belongs_to :scrape

  validates :scrape, presence: true
end
