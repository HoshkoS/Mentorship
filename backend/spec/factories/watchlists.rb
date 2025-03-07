FactoryBot.define do
  factory :watchlist do
    title { "MyString" }
    watched { false }
    user { nil }
  end
end
