class Scrape < ApplicationRecord
  APARTMENTS_URL = 'http://raleigh.craigslist.org/search/apa'
  CARS_URL = 'https://raleigh.craigslist.org/search/cta'

  has_many :listings, dependent: :destroy
  validates :scrape_type, presence: true

  def self.url_for(scrape_type)
    case scrape_type
    when 'Apartments'
      APARTMENTS_URL
    when 'Cars'
      CARS_URL
    end
  end
end
