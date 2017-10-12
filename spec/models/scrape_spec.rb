require 'rails_helper'

describe Scrape do
  it { should have_many :apartment_listings }
  it { should validate_presence_of :scrape_type }
end
